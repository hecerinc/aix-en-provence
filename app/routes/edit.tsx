import { json, ActionFunctionArgs } from '@remix-run/node';
import { type LinkNodeMutation, updateLinkCollection } from '../data';
// import { LinkNode } from '~/models/index.types';

export const action = async ({ params, request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	const newNode: LinkNodeMutation = {
		content: data.content as string,
		description: data.description as string,
		title: data.title as string,
	};
	const collection = await updateLinkCollection(data.nodeId as string, newNode);
	return json({ collection, success: true });
};
