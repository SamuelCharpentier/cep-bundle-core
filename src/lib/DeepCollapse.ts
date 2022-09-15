export type DeepCollapse<T> = T extends object
	? {
			[P in keyof T]: DeepCollapse<T[P]>;
	  }
	: T;
