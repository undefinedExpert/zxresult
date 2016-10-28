/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { expect } from 'chai';
import { call } from 'redux-saga/effects';

import request from 'utils/request';
import constructUrl from 'mechanisms/constructUrl';

import callToApi from '../index';


describe('callToApi Mechanism', () => {
  let generator;
  it('Should construct url from options', () => {
    const fixture = ['/test/endpoint', { page: 1000 }, true];
    generator = callToApi(...fixture);

    const task = generator.next().value;
    const operation = call(constructUrl, ...fixture);
    expect(task).to.be.eql(operation);
  });

  it('Should call api using request function', () => {
    const fixture = 'http://eslotwinski.com';
    const task = generator.next(fixture).value;
    const operation = call(request, fixture);

    expect(task).to.be.eql(operation);
  });
});


