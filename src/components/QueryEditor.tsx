import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { sql } from "@codemirror/lang-sql";
import { EditorState } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";
import {
	placeholder as cmPlaceholder,
	drawSelection,
	EditorView,
	keymap,
	lineNumbers,
} from "@codemirror/view";
import { useEffect, useRef } from "react";

interface Props {
	sqlQuery: string;
	onChange: (sqlQuery: string) => void;
	onRun: () => void;
	isRunning: boolean;
	disabled: boolean;
}

const DEFAULT_TEMPLATE = "SELECT * \nFROM your_table \nLIMIT 15;";

export function QueryEditor({
	sqlQuery: query,
	onChange,
	onRun,
	isRunning,
	disabled,
}: Props) {
	const editorRef = useRef<HTMLDivElement>(null);
	const viewRef = useRef<EditorView | null>(null);

	// Keep callbacks accessible to CodeMirror
	const onChangeRef = useRef(onChange);
	const onRunRef = useRef(onRun);

	// 1. Store the initial query value in a ref so it doesn't trigger reactivity loops
	const initialQueryRef = useRef(query || DEFAULT_TEMPLATE);

	useEffect(() => {
		onChangeRef.current = onChange;
		onRunRef.current = onRun;
	}, [onChange, onRun]);

	useEffect(() => {
		if (!editorRef.current) return;

		const updateListener = EditorView.updateListener.of((update) => {
			if (update.docChanged) {
				onChangeRef.current(update.state.doc.toString());
			}
		});

		const runKeymap = keymap.of([
			{
				key: "Mod-Enter",
				run: () => {
					onRunRef.current();
					return true;
				},
			},
			...defaultKeymap,
			indentWithTab,
		]);

		const state = EditorState.create({
			doc: initialQueryRef.current,

			extensions: [
				// SQL syntax highlighting
				sql(),

				// Dark database IDE theme
				oneDark,

				// Keyboard shortcuts
				runKeymap,

				// Detect changes
				updateListener,

				// Placeholder
				cmPlaceholder(DEFAULT_TEMPLATE),

				// Add drawSelection to cleanly override the native browser cursor heights
				drawSelection(),

				// Add linenumbers
				lineNumbers(),

				// Editor appearance
				EditorView.theme({
					"&": {
						fontSize: "13px",
						minHeight: "160px",
						backgroundColor: "#07121f",
					},

					".cm-scroller": {
						fontFamily:
							'"Geist Mono", "SF Mono", "Monolisa", "Cascadia Code", monospace',

						overflow: "auto",
					},

					".cm-content": {
						padding: "16px 0",
						caretColor: "#22d3c5",
					},

					".cm-line": {
						padding: "0 16px",
					},

					".cm-gutters": {
						backgroundColor: "#07121f",
						color: "#526b80",
						border: "none",
						paddingRight: "8px",
					},

					".cm-activeLineGutter": {
						backgroundColor: "transparent",
						color: "#22d3c5",
					},

					".cm-activeLine": {
						backgroundColor: "rgba(34, 211, 197, 0.035)",
					},

					".cm-selectionBackground": {
						backgroundColor: "rgba(34, 211, 197, 0.18) !important",
					},

					".cm-focused": {
						outline: "none",
					},

					".cm-cursor": {
						borderLeftColor: "#22d3c5",
						borderLeftWidth: "2px", // Makes the custom colored cursor cleaner
						height: "1.4em !important", // Forces the cursor to look at line height, not placeholder height
					},

					".cm-placeholder": {
						color: "#526b80",
					},
				}),

				// Line numbers
				EditorView.lineWrapping,
			],
		});

		const view = new EditorView({
			state,
			parent: editorRef.current,
		});

		viewRef.current = view;

		return () => {
			view.destroy();
			viewRef.current = null;
		};
	}, []);

	/*
	 * Keep CodeMirror synchronized with the React `sql` state.
	 *
	 * This is important when the query is changed outside
	 * of the editor, for example when loading a saved query.
	 */
	useEffect(() => {
		const view = viewRef.current;

		if (!view) return;

		const currentValue = view.state.doc.toString();

		if (currentValue !== query) {
			view.dispatch({
				changes: {
					from: 0,
					to: currentValue.length,
					insert: query,
				},
			});
		}
	}, [query]);

	/*
	 * Disable/enable the editor while a query is running
	 * or when the application disables editing.
	 */
	useEffect(() => {
		const view = viewRef.current;

		if (!view) return;

		view.dom.style.opacity = disabled ? "0.5" : "1";
		view.dom.style.pointerEvents = disabled ? "none" : "auto";
	}, [disabled]);

	return (
		<div className="editor">
			<div className="editor-header">
				<div className="editor-title-group">
					<span className="editor-label">SQL Query</span>

					<span className="editor-language">SQL</span>
				</div>

				<span className="editor-status">
					{isRunning ? "Executing..." : "Ready"}
				</span>
			</div>

			<div ref={editorRef} className="editor-codemirror" />

			<div className="editor-footer">
				<div className="editor-footer-info">
					<span className="editor-shortcut">⌘+↵ / Ctrl+↵</span>

					<span className="editor-hint">Run query</span>
				</div>

				<button
					type="button"
					className="btn btn--primary"
					onClick={onRun}
					disabled={disabled || isRunning || !query.trim()}
				>
					{isRunning ? (
						<>
							<span className="btn-spinner" />
							Running…
						</>
					) : (
						<>
							<span className="btn-play">▶</span>
							Run Query
						</>
					)}
				</button>
			</div>
		</div>
	);
}
