import React from 'react';
import { render } from '@testing-library/react';
import IconArrowDown2 from './icon-arrow-down-2';
import ArrowDownCollapse from './icon-arrow-down-collapse';
import IconArrowDown from './icon-arrow-down';
import ArrowUpCollapse from './icon-arrow-up-collapse';
import IconCamera from './icon-camera';
import IconCaseManagement from './icon-case-management';
import IconConsent from './icon-consent';
import IconCross from './icon-cross';
import IconCross2 from './icon-cross2';
import IconDataSubject from './icon-data-subject';
import IconDelete from './icon-delete';
import IconInfo from './icon-info';
import IconLogout from './icon-logout';
import IconProfile from './icon-profile';
import IconReports from './icon-reports';
import IconSearch2 from './icon-search-2';
import IconSearch from './icon-search';
import IconUpload from './icon-upload';
import IconUserManagement from './icon-user-management';
import IconUser from './icon-user';
import LogoWhite from './logo-white';
import Logo from './logo';

test('Test Icon render without crash', () => {
  const { container } = render(<IconArrowDown2 />);
  expect(container.firstChild).toBeInTheDocument();
});

test('Test Icon render without crash', () => {
  const { container } = render(<>{ArrowDownCollapse}</>);
  expect(container.firstChild).toBeInTheDocument();
});

test('Test Icon render without crash', () => {
  const { container } = render(<IconArrowDown />);
  expect(container.firstChild).toBeInTheDocument();
});

test('Test Icon render without crash', () => {
  const { container } = render(<>{ArrowUpCollapse}</>);
  expect(container.firstChild).toBeInTheDocument();
});

test('Test Icon render without crash', () => {
  const { container } = render(<IconCamera />);
  expect(container.firstChild).toBeInTheDocument();
});

test('Test Icon render without crash', () => {
  const { container } = render(<IconCaseManagement />);
  expect(container.firstChild).toBeInTheDocument();
});

test('Test Icon render without crash', () => {
  const { container } = render(<IconConsent />);
  expect(container.firstChild).toBeInTheDocument();
});

test('Test Icon render without crash', () => {
  const { container } = render(<IconCross />);
  expect(container.firstChild).toBeInTheDocument();
});

test('Test Icon render without crash', () => {
  const { container } = render(<IconCross2 />);
  expect(container.firstChild).toBeInTheDocument();
});

test('Test Icon render without crash', () => {
  const { container } = render(<IconDataSubject />);
  expect(container.firstChild).toBeInTheDocument();
});

test('Test Icon render without crash', () => {
  const { container } = render(<IconCross2 />);
  expect(container.firstChild).toBeInTheDocument();
});

test('Test Icon render without crash', () => {
  const { container } = render(<IconDelete />);
  expect(container.firstChild).toBeInTheDocument();
});

test('Test Icon render without crash', () => {
  const { container } = render(<IconInfo />);
  expect(container.firstChild).toBeInTheDocument();
});

test('Test Icon render without crash', () => {
  const { container } = render(<IconLogout />);
  expect(container.firstChild).toBeInTheDocument();
});

test('Test Icon render without crash', () => {
  const { container } = render(<IconProfile />);
  expect(container.firstChild).toBeInTheDocument();
});

test('Test Icon render without crash', () => {
  const { container } = render(<IconReports />);
  expect(container.firstChild).toBeInTheDocument();
});

test('Test Icon render without crash', () => {
  const { container } = render(<IconSearch2 />);
  expect(container.firstChild).toBeInTheDocument();
});

test('Test Icon render without crash', () => {
  const { container } = render(<IconSearch />);
  expect(container.firstChild).toBeInTheDocument();
});

test('Test Icon render without crash', () => {
  const { container } = render(<IconSearch2 />);
  expect(container.firstChild).toBeInTheDocument();
});

test('Test Icon render without crash', () => {
  const { container } = render(<IconUpload />);
  expect(container.firstChild).toBeInTheDocument();
});

test('Test Icon render without crash', () => {
  const { container } = render(<IconUserManagement />);
  expect(container.firstChild).toBeInTheDocument();
});

test('Test Icon render without crash', () => {
  const { container } = render(<IconUser />);
  expect(container.firstChild).toBeInTheDocument();
});

test('Test Icon render without crash', () => {
  const { container } = render(<LogoWhite />);
  expect(container.firstChild).toBeInTheDocument();
});

test('Test Icon render without crash', () => {
  const { container } = render(<Logo />);
  expect(container.firstChild).toBeInTheDocument();
});
