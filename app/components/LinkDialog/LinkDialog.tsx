import * as React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LinkNode } from '~/models/index.types';
import { useFetcher } from '@remix-run/react';
import { StoreContext } from '~/routes/_index';

interface LinkDialogProps {
	selectedNode: LinkNode | null;
	isOpen: boolean;
	onDialogClose: React.ReactEventHandler;
	isEditing?: boolean;
}

export const LinkDialog: React.FC<LinkDialogProps> = (props: LinkDialogProps) => {
	const { isOpen: isDialogOpen, onDialogClose, selectedNode } = props;
	const { isNew, setIsNew } = React.useContext(StoreContext);
	const [isEditing, setIsEditing] = React.useState<boolean>(false);

	const fetcher = useFetcher();

	const onEditClick: React.MouseEventHandler<HTMLButtonElement> = (_e: React.MouseEvent) => {
		setIsEditing(true);
	};
	React.useEffect(() => {
		if (fetcher?.data?.success) {
			onDialogClose(null);
		}
	}, [fetcher.data]);

	React.useEffect(() => {
		if (!isDialogOpen) {
			setIsEditing(false);
			setIsNew(false);
		}
	}, [isDialogOpen]);

	return (
		<dialog
			open={isDialogOpen}
			className="modalRoot"
			onClick={(e) => {
				e.stopPropagation();
				const target = e.target as HTMLElement;
				if (target.getAttribute('id') === 'mainDialog') {
					onDialogClose(e);
				}
			}}
			id="mainDialog"
		>
			<div className="modalContent-container">
				{isNew || isEditing ? (
					<EditForm fetcher={fetcher} selectedNode={selectedNode} />
				) : selectedNode ? (
					<LinkViewer selectedNode={selectedNode} editBtnHandler={onEditClick} />
				) : null}
			</div>
		</dialog>
	);
};

const LinkViewer: React.FC<{ selectedNode: LinkNode; editBtnHandler: React.MouseEventHandler }> = ({
	selectedNode,
	editBtnHandler,
}) => {
	return (
		<section>
			<div className="space-between">
				<h2 className="title">{selectedNode.title}</h2>
				<button type="button" onClick={editBtnHandler}>
					Edit
				</button>
			</div>
			<p className="description">{selectedNode.description}</p>
			<div className="content">
				<Markdown remarkPlugins={[remarkGfm]}>{selectedNode.content}</Markdown>
			</div>
		</section>
	);
};

interface EditFormProps {
	selectedNode: LinkNode | null;
	fetcher: any;
}

const EditForm = ({ selectedNode, fetcher }: EditFormProps) => {
	const [title, setTitle] = React.useState<string | undefined>(selectedNode?.title);
	const [description, setDescription] = React.useState<string | undefined>(selectedNode?.description);
	const [content, setContent] = React.useState<string | undefined>(selectedNode?.content);

	const isEdit: boolean = selectedNode?.id !== null && selectedNode?.id !== undefined;
	const formAction = isEdit ? '/edit' : '/';

	React.useEffect(() => {
		setTitle(selectedNode?.title ?? '');
		setDescription(selectedNode?.description ?? '');
		setContent(selectedNode?.content ?? '');
	}, [selectedNode]);

	return (
		<fetcher.Form method="post" action={formAction}>
			<fieldset>
				<div className="space-between header">
					<input
						type="text"
						name="title"
						className="nodeTitle"
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
					/>
					<button type="submit">Save</button>
				</div>
				{isEdit ? <input type="hidden" name="nodeId" value={selectedNode!.id} /> : null}
				<input
					type="text"
					name="description"
					className="description"
					value={description}
					onChange={(e) => {
						setDescription(e.target.value);
					}}
				/>
				<textarea
					id="modalBody-ta"
					name="content"
					className="modalBody-ta"
					value={content}
					onChange={(e) => {
						setContent(e.target.value);
					}}
				></textarea>
			</fieldset>
		</fetcher.Form>
	);
};
