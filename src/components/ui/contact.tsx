import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
    const contactInfo = [
        {
            icon: <Mail className="h-4 w-4" />,
            label: 'Email',
            href: 'mailto:henrydengo1107@gmail.com'
        },
        {
            icon: <Phone className="h-4 w-4" />,
            label: 'Phone',
            href: 'tel:0862676117'
        }
    ];

    return (
        <motion.section
            id="contact"
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
                {contactInfo.map((info, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                        <a
                            href={info.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center justify-center gap-2 p-3 border border-gray-800 rounded-lg bg-black/30 hover:border-[#3B82F6]/50 hover:bg-[#3B82F6]/5 transition-all duration-200 group"
                        >
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#3B82F6]/10 group-hover:bg-[#3B82F6]/20 transition-all">
                                <span className="text-[#3B82F6]">{info.icon}</span>
                            </div>
                            <span className="text-white text-sm font-medium">{info.label}</span>
                        </a>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default Contact;
