import type { LinkNode } from './models/index.types';
import { v4 as uuidv4 } from 'uuid';

export type LinkNodeMutation = Omit<LinkNode, 'id' | 'created'>;

export const createLinkCollection = async (data: LinkNodeMutation) => {
	const newNode: LinkNode = {
		...data,
		id: uuidv4(),
		created: new Date(),
	};

	fakeData.push(newNode);
	return newNode;
};

export const getLinkCollections = async () => {
	return fakeData;
};

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
