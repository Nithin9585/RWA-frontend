import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="border-t border-white/10 bg-black/50 backdrop-blur-xl py-8 mt-auto">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-gray-400">
                        © 2024 Diamond RWA. All rights reserved.
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                            Terms
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                            Privacy
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                            Documentation
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
