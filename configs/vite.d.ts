import type { PluginOption } from "vite";

declare const createPinegladePlugin: (params?: {
	/** Node-модули для отслеживания */
	watchedModules?: string[];
}) => PluginOption;

export { createPinegladePlugin };
