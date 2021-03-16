import { pathToFileURL } from 'url';
import { createRequire } from 'module';

export default function ({ adaptWith } = {}) {
	return {
		async adapt(builder) {
			if (!adaptWith) {
				throw new Error('No adapter to use with JungleJS specified');
			}
			
			const require = createRequire(import.meta.url);
			const resolved = require.resolve(adaptWith, { paths: [pathToFileURL(process.cwd()).href] });
			const mod = await import(pathToFileURL(resolved).href);
			const adapter = mod.default(options);
			
			await adapter.adapt(builder);
		}
	};
}