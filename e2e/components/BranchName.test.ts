import {test, expect} from '@playwright/test'
import {visit} from '../test-helpers/storybook'
import {themes} from '../test-helpers/themes'

test.describe('BranchName', () => {
  test.describe('Default', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-branchname--default',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`BranchName.Default.${theme}.png`)

          // Focus state
          await page.keyboard.press('Tab')
          expect(await page.screenshot()).toMatchSnapshot(`BranchName.Default.${theme}.focus.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-branchname--default',
            globals: {
              colorScheme: theme,
            },
          })
          await expect(page).toHaveNoViolations({
            rules: {
              'color-contrast': {
                enabled: theme !== 'dark_dimmed',
              },
            },
          })
        })
      })
    }

    test.describe('with forced underlines', () => {
      test('default @vrt', async ({page}) => {
        await visit(page, {
          id: 'components-branchname--default',
          globals: {
            colorScheme: 'light',
            prefersLinkUnderlines: 'true',
          },
        })

        expect(await page.screenshot()).toMatchSnapshot('BranchName.Default.light.forcedUnderlines.png')
      })
    })
  })
})
