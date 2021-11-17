/*
 * File: /src/core/security/jwt/index.js
 * Version: 1.0.27
 * Project: @siliconmtn/spacelibs-react
 * Description: JSON Web token
 * File Created: Wednesday, 28th July 2021 3:41 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 28th July 2021 4:24 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

/*
 * Code is used from https://www.jonathan-petitcolas.com/2014/11/27/creating-json-web-token-in-javascript.html
 */

import Base64url from 'crypto-js/enc-base64url';
import Utf8 from 'crypto-js/enc-utf8';
import SHA256 from 'crypto-js/hmac-sha256';

/**
 * JWT Sign method
 *
 * @param {*} payload Payload data to put in token
 * @param {*} secret Secret to use to sign token
 * @returns {*} Signed JWT
 */
function sign(payload, secret) {
  if (!payload) throw Error('Payload was empty');
  if (!secret)
    throw Error('Secret is empty, we need a secret to sign the token');

  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  // Encode Header
  const stringifiedHeader = Utf8.parse(JSON.stringify(header));
  const encodedHeader = Base64url.stringify(stringifiedHeader);

  // Encode Payload
  const stringifiedData = Utf8.parse(JSON.stringify(payload));
  const encodedData = Base64url.stringify(stringifiedData);

  // Unsigned token
  const token = `${encodedHeader}.${encodedData}`;

  const signature = Base64url.stringify(SHA256(token, secret));

  // Signed token
  return `${token}.${signature}`;
}

export { sign };
