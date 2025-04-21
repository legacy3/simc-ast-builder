grammar SimCExpr;

//===== PARSER RULES =====

// Entry point for parsing expressions and action lines
parse: actionLine EOF | commentLine EOF | expression EOF;

// Comment line starting with #
commentLine: COMMENT;

//----- Action definitions -----

// Unified action line definition for all action types
actionLine:
	'actions' ('.' sublistName)? ('=' | '+=') ('/')? actionName (
		',' actionParam
	)*;

// Generic parameter definition for actions
actionParam: identifier OP_EQ expression;

//----- Expressions -----

// Identifier is any of the three token types
identifier: NUMBER | STRING | MIXED_ID;

actionName: identifier;
sublistName: identifier;

// Access expression for identifiers with dot notation
accessPattern: identifier ('.' identifier)*;

// Expression parsing rules with precedence (matching SimulationCraft)
expression:
	OP_PAREN_LEFT expression OP_PAREN_RIGHT					# parenExpr
	| (OP_CEIL | OP_FLOOR) OP_PAREN_LEFT expression OP_PAREN_RIGHT		# mathFuncExpr
	| (OP_NOT | OP_PLUS | OP_MINUS | OP_ABS) expression		# unaryExpr
	| expression (OP_MUL | OP_DIV | OP_MOD) expression		# multiplicativeExpr
	| expression (OP_PLUS | OP_MINUS) expression			# additiveExpr
	| expression (OP_MAX | OP_MIN) expression				# minMaxExpr
	| expression (OP_GT | OP_GE | OP_LT | OP_LE | OP_EQ | OP_EQEQ | OP_NE) expression	# comparisonExpr
	| expression OP_AND expression							# andExpr
	| expression OP_XOR expression							# xorExpr
	| expression OP_OR expression							# orExpr
	| NUMBER												# numberExpr
	| STRING												# stringExpr
	| MIXED_ID												# mixedIdExpr
	| accessPattern											# accessExpr
	| .														# anyTokenExpr;

//===== LEXER RULES =====

//----- Operators -----

// Logical operators
OP_AND: '&';
OP_OR: '|';
OP_XOR: '^';  // XOR, not power
OP_NOT: '!';

// Arithmetic operators
OP_PLUS: '+';
OP_MINUS: '-';
OP_MUL: '*';
OP_DIV: '%';  // Division is % in SimC (not /)
OP_MOD: '%%'; // Modulus is %% in SimC
OP_ABS: '@';  // Absolute value

// Math functions
OP_CEIL: 'ceil';
OP_FLOOR: 'floor';

// Comparison operators
OP_GT: '>';
OP_GE: '>=';
OP_LT: '<';
OP_LE: '<=';
OP_EQ: '=';
OP_EQEQ: '==';
OP_NE: '!=';
OP_MAX: '<?';  // Max is <? in SimC (returns greater value)
OP_MIN: '>?';  // Min is >? in SimC (returns lesser value)

// Grouping operators
OP_PAREN_LEFT: '(';
OP_PAREN_RIGHT: ')';

//----- Basic lexer rules -----

// Pure number (integer or floating point)
NUMBER: [0-9]+ ('.' [0-9]+)?;

// Mixed ID (starts with a digit but contains letters)
MIXED_ID: [0-9]+ [a-zA-Z] [a-zA-Z0-9_/]*;

// String (traditional identifier that starts with a letter)
STRING: [a-zA-Z] [a-zA-Z0-9_/]*;

// Comments and whitespace
COMMENT: '#' ~[\r\n]*;
WS: [ \t\n\r\f]+ -> skip;