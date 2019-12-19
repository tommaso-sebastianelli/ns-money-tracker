import { PropertyConverter } from "nativescript-ui-dataform";

export interface RadFormMetadataProperty {
	converter?: PropertyConverter,
	editor:
	"Text" | //Simple text input.
	"MultilineText" | //Text input, which supports more than one line.
	"Email" | //Again for text input, with email optimized keyboard.
	"Password" | //Masks the entered text.
	"Phone" | //Again for text input, with phone optimized keyboard.
	"Number" | //For input of numbers from the keyboard.
	"Decimal" | //For input of numbers from the keyboard, supports decimal values.
	"Switch" | //For boolean values.
	"Stepper" | //For choosing a number by tapping on buttons to increase or decrease it.
	"Slider" | //For choosing a number by sliding between the minimum and maximum values.
	"Picker" | //For picking a value from a predefined list (drop-down list).
	"SegmentedEditor" | //For picking a value from a predefined list (horizontal list).
	"List" | //For picking a value from a predefined list (vertical list).
	"DatePicker" | //For picking a date from a calendar.
	"TimePicker" | //For picking a time from a clock.
	"AutoCompleteInline" | //For picking single or multiple items from a suggestion list.
	"Label"; //For simply displaying the property value inside a non-editable label.;
	editorParams?: Array<{ step?: number, min?: number, max?: number }>;
	displayName: string;
	groupname?: string;
	hintText?: string;
	ignore?: boolean;
	index: number;
	name: string;
	readOnly?: boolean;
	required?: boolean;
	validators: Array<{
		name:
		"NonEmptyValidator" |
		"RangeValidator" |
		"MinimumLengthValidator" |
		"MaximumLengthValidator" |
		"EmailValidator" |
		"PhoneValidator" |
		"IsTrueValidator" |
		"RegExValidator" |
		"Custom Validators" |
		"References";
		params?: {
			length?: number,
			regex?: string,
			errorMessage?: string
		}
	}>;
	valuesProvider: Array<string>;
}

export interface RadFormMetadata {
	isReadOnly: boolean;
	commitMode: "Immediate" | "OnLostFocus" | "Manual";
	propertyAnnotations: Array<RadFormMetadataProperty>;
}