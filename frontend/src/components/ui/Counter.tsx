import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

type CounterProps = {
  value: number;
  suffix?: string;
};

export default function Counter({ value, suffix = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1800, bounce: 0 });
  const rounded = useTransform(spring, (latest) => `${Math.round(latest)}${suffix}`);

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, motionValue, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}
