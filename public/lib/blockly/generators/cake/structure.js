'use strict';

goog.provide('Blockly.cake.structure');

goog.require('Blockly.cake');


Blockly.cake['structure_define'] = function(block) {
  var funcName = Blockly.cake.variableDB_.getName(
    block.getFieldValue('NAME'), null);

  var mems = [];
  var memTypes = [];
  var typePlusMems = [];
  for (var x = 0; x < block.members_.length; x++) {
    mems[x] = Blockly.cake.variableDB_.getName(block.members_[x],
      Blockly.Variables.NAME_TYPE);
    memTypes[x] = block.types_[x];
    typePlusMems[x] = memTypes[x] + ' ' + mems[x] + ';\n';
  }
  var structDef = 'typedef struct\n';
  var code = structDef + '{\n' + typePlusMems.join('') + '} ' + funcName + ';\n';
  return code;
};

Blockly.cake['structure_declare'] = function(block) {
  var type = Blockly.cake.variableDB_.getName(
    block.getFieldValue('TYPES'), null);
  var structName = Blockly.cake.variableDB_.getName(
    block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  return type + ' ' + structName + ';\n';
};

Blockly.cake['structure_get'] = function(block) {
  var name = Blockly.cake.variableDB_.getName(
    block.getFieldValue('NAME'), null);
  var structMem = Blockly.cake.variableDB_.getName(
    block.getFieldValue('Mem'), Blockly.Variables.NAME_TYPE);
  var code;
  if (structMem == 'Itself')
    var code = name;
  else
    var code = name + '.' + structMem;

  return [code, Blockly.cake.ORDER_ATOMIC];
};

Blockly.cake['structure_set'] = function(block) {
  var name = block.getFieldValue('NAME');
  var structMem = Blockly.cake.variableDB_.getName(
    block.getFieldValue('Mem'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.cake.valueToCode(block, 'VALUE',
    Blockly.cake.ORDER_ASSIGNMENT) || '0';
  var fullName;
  if (structMem == 'Itself') {
    fullName = name;
  } else {
    fullName = name + '.' + structMem;
  }
  return fullName + ' = ' + argument0 +';\n';
};