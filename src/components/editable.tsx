'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
	editorRef: React.RefObject<HTMLPreElement | null>;
	placeholder: string;
	content: string;
	onContentChange(value: string): void;
};

export default function Editable({ editorRef, placeholder, content, onContentChange }: Props) {
	const [isInitialized, setIsInitialized] = useState(false);
	const localContent = useRef(content);

	// Handle placeholder class
	const handleFocus = () => {
		if (editorRef.current && editorRef.current.textContent === '') {
			editorRef.current.classList.remove('placeholder');
		}
	};

	const handleBlur = () => {
		if (editorRef.current) {
			// Check if div is actually empty (handles the <br> case)
			const isEmpty =
				editorRef.current.innerHTML === '' ||
				editorRef.current.innerHTML === '<br>' ||
				editorRef.current.textContent === '';

			if (isEmpty) {
				editorRef.current.classList.add('placeholder');
				// Clear the <br> if present
				if (editorRef.current.innerHTML === '<br>') {
					editorRef.current.innerHTML = '';
				}
			}
		}
	};

	const setContent = (target: HTMLPreElement) => {
		const newContent = target.textContent || '';

		if (newContent !== localContent.current) {
			localContent.current = newContent;
			onContentChange(newContent);
		}
	};

	// Handle input changes
	const handleInput = (event: React.FormEvent<HTMLPreElement>) => {
		setContent(event.target as HTMLPreElement);
	};

	const handlePaste = (event: React.ClipboardEvent) => {
		event.preventDefault();

		const text = event.clipboardData.getData('text/plain');
		const selection = window.getSelection();

		if (!selection || !selection.rangeCount) return;

		const range = selection.getRangeAt(0);
		const textNode = document.createTextNode(text);

		range.deleteContents();
		range.insertNode(textNode);
		range.setStartAfter(textNode);
		range.setEndAfter(textNode);
		selection.removeAllRanges();
		selection.addRange(range);

		setContent(event.target as HTMLPreElement);
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		if (editorRef.current) {
			editorRef.current.innerHTML = '';
			editorRef.current.classList.add('placeholder');
			localContent.current = '';
			onContentChange('');
		}
	};

	// Initialize component
	useEffect(() => {
		if (!editorRef.current) return;

		// Set initial content
		if (!isInitialized) {
			editorRef.current.textContent = content;
			localContent.current = content;
			setIsInitialized(true);

			// Add placeholder if needed
			if (content === '') {
				editorRef.current.classList.add('placeholder');
			}
		}
	}, [editorRef, content, isInitialized]);

	return (
		<pre
			className="editable-div min-h-[2rem]"
			contentEditable
			suppressContentEditableWarning
			ref={editorRef}
			onInput={handleInput}
			onFocus={handleFocus}
			onBlur={handleBlur}
			onPaste={handlePaste}
			onSubmit={handleSubmit}
			data-placeholder={placeholder}
		/>
	);
}
