import path from 'path';
import { expect, test } from '@playwright/test';

test('uploads csv files, merges, and exposes download link', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Merge now' })).toBeDisabled();
  const fileInput = page.locator('#file-input');
  const fixtures = path.join(__dirname, 'fixtures');

  await fileInput.setInputFiles([
    path.join(fixtures, 'a.csv'),
    path.join(fixtures, 'b.csv'),
  ]);
  await expect(page.getByText('a.csv')).toBeVisible();
  await expect(page.getByText('b.csv')).toBeVisible();
  await page.getByLabel('Choose how rows are combined.').selectOption('append');
  await page.getByRole('button', { name: 'Merge now' }).click();
  await expect(page.getByText('Rows merged: 2')).toBeVisible();
  const downloadLink = page.getByRole('link', { name: 'Download merged CSV' });

  await expect(downloadLink).toBeVisible();
  await expect(downloadLink).toHaveAttribute('download', 'merged.csv');
});
