export type MenuIcon = 'new' | 'new-folder' | 'delete';

export interface RightClickMenuEntry {
	icon: MenuIcon;
	label: string;
	action: () => void;
}