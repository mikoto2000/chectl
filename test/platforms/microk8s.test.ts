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
import { MicroK8sHelper } from '../../src/platforms/microk8s';
import * as execa from 'execa';

jest.mock('execa');

let mh = new MicroK8sHelper()

describe('start', () => {
  fancy
    .it('verifies that microk8s is running', async () => {
      (execa as any).mockResolvedValue({ code: 0 })
      const res = await mh.isMicroK8sRunning()
      expect(res).to.equal(true)
    })

  fancy
    .it('verifies that microk8s is not running', async () => {
      (execa as any).mockResolvedValue({ code: 1 })
      const res = await mh.isMicroK8sRunning()
      expect(res).to.equal(false)
    })

  fancy
    .it('obtains the ip', async () => {
      const output = `apiVersion: v1
        clusters:
        - cluster:
            server: http://127.0.0.1:8080
          name: microk8s-cluster`;

      (execa as any).mockResolvedValue({ code: 0, stdout: output })
      const res = await mh.getMicroK8sIP()
      expect(res).to.equal('127.0.0.1')
    })
})
