/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating cake for math blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.cake.math');

goog.require('Blockly.cake');


Blockly.cake['math_number'] = function(block) {
  // Numeric value.
  var code = parseFloat(block.getFieldValue('NUM'));
  return [code, Blockly.cake.ORDER_ATOMIC];
};

Blockly.cake['math_arithmetic'] = function(block) {
  // Basic arithmetic operators, and power.
  var OPERATORS = {
    'ADD': [' + ', Blockly.cake.ORDER_ADDITION],
    'MINUS': [' - ', Blockly.cake.ORDER_SUBTRACTION],
    'MULTIPLY': [' * ', Blockly.cake.ORDER_MULTIPLICATION],
    'DIVIDE': [' / ', Blockly.cake.ORDER_DIVISION],
    'POWER': [null, Blockly.cake.ORDER_COMMA]  // Handle power separately.
  };
  var tuple = OPERATORS[block.getFieldValue('OP')];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.cake.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.cake.valueToCode(block, 'B', order) || '0';
  var code;
  // Power in cake requires a special case since it has no operator.
  if (!operator) {
    code = 'Math.pow(' + argument0 + ', ' + argument1 + ')';
    return [code, Blockly.cake.ORDER_FUNCTION_CALL];
  }
  code = argument0 + operator + argument1;
  return [code, order];
};

Blockly.cake['math_modulo'] = function(block) {
  // Remainder computation.
  var argument0 = Blockly.cake.valueToCode(block, 'DIVIDEND',
      Blockly.cake.ORDER_MODULUS) || '0';
  var argument1 = Blockly.cake.valueToCode(block, 'DIVISOR',
      Blockly.cake.ORDER_MODULUS) || '0';
  var code = argument0 + ' % ' + argument1;
  return [code, Blockly.cake.ORDER_MODULUS];
};

Blockly.cake['library_func_paren'] = function(block) {
  // Text value.
  var code = block.getFieldValue('TEXT');
  return [code, Blockly.cake.ORDER_ATOMIC];
};

Blockly.cake['library_math_sin'] = function(block) {
  // Scan statement.
  var argument0 = Blockly.cake.valueToCode(block, 'TEXT',
      Blockly.cake.ORDER_NONE) || '\'\'';
  Blockly.cake.definitions_['include_cake_math'] =
        '#include <math.h>';
  return 'sin(' + argument0 + ');\n';
};

Blockly.cake['library_math_cos'] = function(block) {
  // Scan statement.
  var argument0 = Blockly.cake.valueToCode(block, 'TEXT',
      Blockly.cake.ORDER_NONE) || '\'\'';
  Blockly.cake.definitions_['include_cake_math'] =
        '#include <math.h>';
  return 'cos(' + argument0 + ');\n';
};
Blockly.cake['library_math_tan'] = function(block) {
  // Scan statement.
  var argument0 = Blockly.cake.valueToCode(block, 'TEXT',
      Blockly.cake.ORDER_NONE) || '\'\'';
  Blockly.cake.definitions_['include_cake_math'] =
        '#include <math.h>';
  return 'tan(' + argument0 + ');\n';
};

Blockly.cake['library_math_pow'] = function(block) {
  // Scan statement.
  var argument0 = Blockly.cake.valueToCode(block, 'TEXT',
      Blockly.cake.ORDER_NONE) || '\'\'';
  Blockly.cake.definitions_['include_cake_math'] =
        '#include <math.h>';
  return 'pow(' + argument0 + ');\n';
};

Blockly.cake['library_math_sqrt'] = function(block) {
  // Scan statement.
  var argument0 = Blockly.cake.valueToCode(block, 'TEXT',
      Blockly.cake.ORDER_NONE) || '\'\'';
  Blockly.cake.definitions_['include_cake_math'] =
        '#include <math.h>';
  return 'sqrt(' + argument0 + ');\n';
};

Blockly.cake['library_math_abs'] = function(block) {
  // Scan statement.
  var argument0 = Blockly.cake.valueToCode(block, 'TEXT',
      Blockly.cake.ORDER_NONE) || '\'\'';
  Blockly.cake.definitions_['include_cake_math'] =
        '#include <math.h>';
  return 'abs(' + argument0 + ');\n';
};