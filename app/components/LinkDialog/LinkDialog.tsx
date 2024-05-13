import * as React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LinkNode } from '~/models/index.types';
import { StoreContext } from '~/routes/_index';

interface LinkDialogProps {
	selectedNode: LinkNode | null;
	isOpen: boolean;
	onDialogClose: React.ReactEventHandler;
	onSaveHandler: (node: Partial<LinkNode>) => void;
	isEditing?: boolean;
}

export const LinkDialog: React.FC<LinkDialogProps> = (props: LinkDialogProps) => {
	const { isOpen: isDialogOpen, onDialogClose, selectedNode, onSaveHandler } = props;
	const { isNew, setIsNew } = React.useContext(StoreContext);
	console.log(isNew);
	const [isEditing, setIsEditing] = React.useState<boolean>(false);

	const onEditClick: React.MouseEventHandler<HTMLButtonElement> = (_e: React.MouseEvent) => {
		setIsEditing(true);
	};

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
					<EditForm
						selectedNode={selectedNode}
						onSaveHandler={(e, node) => {
							onSaveHandler(node);
							onDialogClose(e);
						}}
					/>
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
	onSaveHandler: (e: React.MouseEvent, node: Partial<LinkNode>) => void;
	selectedNode: LinkNode | null;
}

const EditForm: React.FC<EditFormProps> = ({ onSaveHandler, selectedNode }) => {
	const [title, setTitle] = React.useState<string | undefined>(selectedNode?.title);
	const [description, setDescription] = React.useState<string | undefined>(selectedNode?.description);
	const [content, setContent] = React.useState<string | undefined>(selectedNode?.content);

	React.useEffect(() => {
		setTitle(selectedNode?.title ?? '');
		setDescription(selectedNode?.description ?? '');
		setContent(selectedNode?.content ?? '');
	}, [selectedNode]);

	const saveHandler: React.MouseEventHandler<HTMLButtonElement> = (e: React.MouseEvent) => {
		const node: Partial<LinkNode> = {
			...selectedNode,
			created: selectedNode?.created ?? new Date(),
			lastUpdated: new Date(),
			title: title ?? '',
			description: description ?? '',
			content: content ?? '',
		};
		onSaveHandler(e, node);
	};

	return (
		<form>
			<fieldset>
				<div className="space-between header">
					<input
						type="text"
						name="nodeTitle"
						className="nodeTitle"
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
					/>
					<button type="button" onClick={saveHandler}>
						Save
					</button>
				</div>
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
					name="modalBody-ta"
					className="modalBody-ta"
					value={content}
					onChange={(e) => {
						setContent(e.target.value);
					}}
				></textarea>
			</fieldset>
		</form>
	);
};
