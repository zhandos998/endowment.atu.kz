<?php

namespace App\Support;

use DOMDocument;
use DOMElement;
use DOMNode;

class HtmlSanitizer
{
    private const ALLOWED_TAGS = [
        'a',
        'b',
        'blockquote',
        'br',
        'div',
        'em',
        'figcaption',
        'figure',
        'h2',
        'h3',
        'hr',
        'i',
        'img',
        'li',
        'ol',
        'p',
        's',
        'span',
        'strike',
        'strong',
        'u',
        'ul',
    ];

    private const REMOVE_WITH_CONTENT = [
        'embed',
        'iframe',
        'math',
        'object',
        'script',
        'style',
        'svg',
    ];

    /**
     * @var array<string, array<int, string>>
     */
    private const ALLOWED_ATTRIBUTES = [
        'a' => ['href', 'target', 'title', 'rel'],
        'blockquote' => ['style'],
        'div' => ['style'],
        'figure' => ['style'],
        'h2' => ['style'],
        'h3' => ['style'],
        'img' => ['alt', 'src', 'style', 'title'],
        'ol' => ['style'],
        'p' => ['style'],
        'span' => ['style'],
        'ul' => ['style'],
    ];

    public static function sanitize(?string $html): string
    {
        if ($html === null || trim($html) === '') {
            return '';
        }

        $document = new DOMDocument('1.0', 'UTF-8');
        $previous = libxml_use_internal_errors(true);

        $document->loadHTML(
            '<?xml encoding="UTF-8"><div id="html-sanitizer-root">'.$html.'</div>',
            LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD
        );

        libxml_clear_errors();
        libxml_use_internal_errors($previous);

        $root = $document->getElementById('html-sanitizer-root');

        if (! $root instanceof DOMElement) {
            return '';
        }

        self::sanitizeChildren($root);

        $clean = '';
        foreach ($root->childNodes as $child) {
            $clean .= $document->saveHTML($child);
        }

        return trim($clean);
    }

    private static function sanitizeChildren(DOMNode $node): void
    {
        foreach (iterator_to_array($node->childNodes) as $child) {
            if (! $child instanceof DOMElement) {
                continue;
            }

            self::sanitizeElement($child);
        }
    }

    private static function sanitizeElement(DOMElement $element): void
    {
        $tag = strtolower($element->tagName);

        if (in_array($tag, self::REMOVE_WITH_CONTENT, true)) {
            $element->parentNode?->removeChild($element);

            return;
        }

        if (! in_array($tag, self::ALLOWED_TAGS, true)) {
            self::unwrapElement($element);

            return;
        }

        self::sanitizeAttributes($element, $tag);
        self::sanitizeChildren($element);
    }

    private static function unwrapElement(DOMElement $element): void
    {
        $parent = $element->parentNode;

        if (! $parent) {
            return;
        }

        while ($element->firstChild) {
            $parent->insertBefore($element->firstChild, $element);
        }

        $parent->removeChild($element);
    }

    private static function sanitizeAttributes(DOMElement $element, string $tag): void
    {
        $allowed = self::ALLOWED_ATTRIBUTES[$tag] ?? [];

        foreach (iterator_to_array($element->attributes) as $attribute) {
            $name = strtolower($attribute->name);
            $value = trim($attribute->value);

            if (str_starts_with($name, 'on') || ! in_array($name, $allowed, true)) {
                $element->removeAttribute($attribute->name);

                continue;
            }

            if (in_array($name, ['href', 'src'], true) && ! self::isSafeUrl($value, $tag === 'img')) {
                $element->removeAttribute($attribute->name);

                continue;
            }

            if ($name === 'style') {
                $style = self::sanitizeStyle($value);

                if ($style === '') {
                    $element->removeAttribute($attribute->name);
                } else {
                    $element->setAttribute('style', $style);
                }
            }
        }

        if ($tag === 'a' && $element->getAttribute('target') === '_blank') {
            $element->setAttribute('rel', 'noopener noreferrer');
        }
    }

    private static function isSafeUrl(string $value, bool $allowImages): bool
    {
        if ($value === '') {
            return false;
        }

        if (str_starts_with($value, '/') || str_starts_with($value, '#')) {
            return true;
        }

        $scheme = parse_url($value, PHP_URL_SCHEME);

        if ($scheme === null) {
            return true;
        }

        $scheme = strtolower($scheme);
        $allowedSchemes = $allowImages ? ['http', 'https'] : ['http', 'https', 'mailto', 'tel'];

        return in_array($scheme, $allowedSchemes, true);
    }

    private static function sanitizeStyle(string $style): string
    {
        $allowedProperties = [
            'color',
            'font-size',
            'height',
            'margin-left',
            'margin-right',
            'text-align',
            'width',
        ];
        $clean = [];

        foreach (explode(';', $style) as $declaration) {
            [$property, $value] = array_pad(explode(':', $declaration, 2), 2, null);

            if ($property === null || $value === null) {
                continue;
            }

            $property = strtolower(trim($property));
            $value = trim($value);
            $lowerValue = strtolower($value);

            if (
                ! in_array($property, $allowedProperties, true)
                || $value === ''
                || str_contains($lowerValue, 'url')
                || str_contains($lowerValue, 'expression')
                || str_contains($lowerValue, 'javascript:')
                || str_contains($value, '<')
                || str_contains($value, '>')
            ) {
                continue;
            }

            if (! self::isAllowedStyleValue($property, $value)) {
                continue;
            }

            $clean[] = $property.':'.$value;
        }

        return implode(';', $clean);
    }

    private static function isAllowedStyleValue(string $property, string $value): bool
    {
        return match ($property) {
            'color' => preg_match('/^(#[0-9a-f]{3,8}|rgba?\([0-9,\s.]+\)|[a-z]+)$/i', $value) === 1,
            'font-size', 'height', 'width' => preg_match('/^(auto|[0-9.]+(px|rem|em|%))$/i', $value) === 1,
            'margin-left', 'margin-right' => preg_match('/^(auto|[0-9.]+(px|rem|em|%))$/i', $value) === 1,
            'text-align' => in_array(strtolower($value), ['left', 'center', 'right', 'justify'], true),
            default => false,
        };
    }
}
