import { Utensils } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-2">
            <span className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                <Utensils
                    size={18}
                    strokeWidth={2}
                    absoluteStrokeWidth={true}
                    className="cursor-pointer text-white"
                />
            </span>
            <span className="text-xl font-bold text-orange-400">FoodieBite</span>
        </Link>
    );
};

export default Logo;