import type { LinkNode } from './models/index.types';
export const fakeData: LinkNode[] = [
	{
		id: '1',
		title: 'Link collection 1',
		content: 'https://electronics.sony.com/imaging/lenses/full-frame-e-mount/p/sel24105g-2',
		description: 'A small description',
		created: new Date(),
		lastUpdated: new Date(),
	},
	{
		id: '2',
		title: 'Link collection 2',
		content: '',
		description: 'A small description x2',
		created: new Date(),
		lastUpdated: new Date(),
	},
];
