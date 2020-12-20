/**
 * Parses type declarations attached to the `id` field
 * 
 * @example <caption>No Type</caption>
 * // input
 * { "id": true, ... }
 * // output
 * { "id": true, ... }
 * 
 * @example <caption>Only Package Type</caption>
 * // input
 * { "id:component": true, ... }
 * { "id:cmp": true, ... }
 * // output
 * { "id": true, "isComponent": true, ... }
 * 
 * @example <caption>Package Type and Subtype</caption>
 * // input
 * { "id:component:text": true, ... }
 * { "id:cmp:text": true, ... }
 * // output
 * { "id": true, "isComponent": true, type: "text", ... }
 * 
 * @example <caption>Package Type and Multiple Subtypes</caption>
 * // input
 * { "id:component:text:h1": true, ... }
 * { "id:cmp:text:h1": true, ... }
 * // output
 * { "id": true, "isComponent": true, type: "text:h1", ... }
 * 
 */

import { ParseOutput, PackageRaw } from './common';
import { PackageCtrl } from '../../system/Package';
import resolveTypeDeclarationToCtrl from '../../system/utils/resolveTypeDeclarationToCtrl';

const parse = (packageRaw: PackageRaw): ParseOutput<PackageRaw> => {

  if (typeof packageRaw !== 'object') {
    return { error: 'Invalid package' }
  }
  
  const keys = Object.keys(packageRaw);
  
  // Find `id:...` fields
  const idFieldIndex = keys.findIndex(k => {
    return k.split(':')[0] === 'id';
  })

  // this package has no type declaration syntax (id omitted)
  if (idFieldIndex === -1) return { package: packageRaw };

  const idField = keys[idFieldIndex];
  const idFieldParts = idField.split(':');

  // this package has no type declaration syntax
  if (!idFieldParts[1]) return { package: packageRaw };
  
  // extract package type declaration and subtypes from the id
  const packageType = idFieldParts[1];
  const packageSubtype = idFieldParts.slice(2).join(':');

  // resolve package type dec - receive package ctrl instance
  const targetCtrl: PackageCtrl = resolveTypeDeclarationToCtrl(packageType);

  // package type declaration invalid
  if (!targetCtrl) return { error: 'Invalid type declaration' };
  
  // attach type declaration
  packageRaw[targetCtrl.getTypeDeclarationKey()] = true;

  // attach subtype if exists
  if (packageSubtype) packageRaw.type = packageSubtype;

  return {
    package: {
      ...packageRaw,
    }
  }
}

export default parse;