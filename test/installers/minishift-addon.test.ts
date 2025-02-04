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
import * as execa from 'execa'

import { MinishiftAddonHelper } from '../../src/installers/minishift-addon'

jest.mock('execa')

describe('Minishift addon helper', () => {
  fancy
    .it('extracts the tag part from an image name', async () => {
      const image = 'eclipse/che:latest'
      const tag = MinishiftAddonHelper.getImageTag(image)
      expect(tag).to.equal('latest')
    })

  fancy
    .it('extracts the repo part from an image name', async () => {
      const image = 'eclipse/che:latest'
      const repository = MinishiftAddonHelper.getImageRepository(image)
      expect(repository).to.equal('eclipse/che')
    })

  fancy
    .it('returns the repo part even if an image has no tag', async () => {
      const image = 'eclipse/che'
      const repository = MinishiftAddonHelper.getImageRepository(image)
      expect(repository).to.equal('eclipse/che')
    })

  fancy
    .it('returns latest as tag if an image has no tag', async () => {
      const image = 'eclipse/che'
      const tag = MinishiftAddonHelper.getImageTag(image)
      expect(tag).to.equal('latest')
    })

  fancy
    .it('check grab Version 1.34', async () => {
      const minishiftVersionOutput = 'minishift v1.34.0+f5db7cb';
      (execa as any).mockResolvedValue({ code: 0, stdout: minishiftVersionOutput })
      const version = await MinishiftAddonHelper.grabVersion();
      expect(version).to.equal(134)
    })

  fancy
    .it('check grab Version 1.33', async () => {
      const minishiftVersionOutput = 'minishift v1.33.0+ba29431';
      (execa as any).mockResolvedValue({ code: 0, stdout: minishiftVersionOutput })
      const version = await MinishiftAddonHelper.grabVersion();
      expect(version).to.equal(133)
    })


})
