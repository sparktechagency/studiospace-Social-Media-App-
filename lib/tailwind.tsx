// lib/tailwind.ts

import { create } from 'twrnc';

// Import your config
import config from '../tailwind.config'; // <-- Adjust the path to your config file

// Create a custom `tw` function
const tw = create(config as any);

// Export it for use in your components
export default tw;