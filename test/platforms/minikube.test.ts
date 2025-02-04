/*********************************************************************
 * Copyright (c) 2019 Red Hat, Inc.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 **********************************************************************/
// tslint:disable:object-curly-spacing
import { expect, fancy } from 'fancy-test'
import { MinikubeHelper } from '../../src/platforms/minikube';
import * as execa from 'execa';

jest.mock('execa');

let mh = new MinikubeHelper()

describe('start', () => {
  fancy
    .it('verifies that minikube is running', async () => {
      (execa as any).mockResolvedValue({ code: 0, stdout: 'minikube: Running' })
      const res = await mh.isMinikubeRunning()
      expect(res).to.equal(true)
    })

  fancy
    .it('verifies that minikube is not running', async () => {
      (execa as any).mockResolvedValue({ code: 1, stdout: 'minikube: Stopped' })
      const res = await mh.isMinikubeRunning()
      expect(res).to.equal(false)
    })
})
