import {Component, OnInit, OnChanges, SimpleChanges, ElementRef, Input, Inject, Optional} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import CodeMirror from 'codemirror';

import {WA_CODEMIRROR_DEFAULTS} from './default-configuration';


const codemirrorInputOptions: Array<string> = [
	'mode', 'theme', 'lineNumbers', 'viewportMargin',
];


@Component({
	selector: 'wa-codemirror',
	template: '',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: CodemirrorComponent,
			multi: true,
		},
	],
})
export class CodemirrorComponent implements OnInit, OnChanges, ControlValueAccessor
{


	@Input()
	public mode: string|undefined;

	@Input()
	public theme: string|undefined;

	@Input()
	public lineNumbers: boolean|undefined;

	@Input()
	public viewportMargin: number|undefined;

	protected codemirror: CodeMirror.Editor;

	private defaultValue: string|undefined;

	private defaults: CodeMirror.EditorConfiguration;


	constructor(
		private $el: ElementRef,
		@Inject(WA_CODEMIRROR_DEFAULTS) @Optional() defaults: CodeMirror.EditorConfiguration,
	) {
		this.defaults = defaults || {};
	}


	public ngOnInit(): void
	{
		const config = {...this.defaults};

		if (typeof this.lineNumbers !== 'undefined') {
			config.lineNumbers = this.lineNumbers;
		}

		if (typeof this.mode !== 'undefined') {
			config.mode = this.mode;
		}

		if (typeof this.theme !== 'undefined') {
			config.theme = this.theme;
		}

		if (typeof this.viewportMargin !== 'undefined') {
			config.viewportMargin = this.viewportMargin;
		}

		if (typeof this.defaultValue !== 'undefined') {
			config.value = this.defaultValue;
		}

		this.codemirror = CodeMirror(this.$el.nativeElement, config);

		this.codemirror.on('change', (editor) => {
			this.onChange(editor.getValue());
		});

		this.codemirror.on('blur', () => {
			this.onTouched();
		});
	}


	public ngOnChanges(changes: SimpleChanges): void
	{
		if (!this.codemirror) {
			return;
		}

		for (let option in changes) {
			if (changes.hasOwnProperty(option) && codemirrorInputOptions.indexOf(option) >= 0) {
				this.codemirror.setOption(option, changes[option].currentValue);
			}
		}
	}


	public writeValue(value: string): void
	{
		if (this.codemirror) {
			this.codemirror.setValue(value);
		} else {
			this.defaultValue = value;
		}
	}


	public registerOnChange(fn: (_: any) => void): void
	{
		this.onChange = fn;
	}


	public registerOnTouched(fn: () => void): void
	{
		this.onTouched = fn;
	}


	private onChange = (_: any) => {};


	private onTouched = () => {};

}
