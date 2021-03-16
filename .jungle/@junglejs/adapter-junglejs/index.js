import { pathToFileURL } from 'url';
import { createRequire } from 'module';

export default function ({ adaptwith, adaptwithoptions } = {}) {
	return {
		async adapt(builder) {
			if (!adaptwith) {
				throw new Error('No adapter to use with JungleJS specified');
			}
			
			const require = createRequire(import.meta.url);
			const resolved = require.resolve(adaptwith, { paths: [pathToFileURL(process.cwd()).href] });
			const mod = await import(pathToFileURL(resolved).href);
			const adapter = mod.default(adaptwithoptions);
			
			await adapter.adapt(builder);
		}
	};
}