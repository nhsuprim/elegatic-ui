"use client";
import { motion } from "framer-motion";

const FadeInUp = ({
    children,
    delay = 0,
}: {
    children: React.ReactNode;
    delay?: number;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            viewport={{ once: false, amount: 0.3 }}
        >
            {children}
        </motion.div>
    );
};

export default FadeInUp;
