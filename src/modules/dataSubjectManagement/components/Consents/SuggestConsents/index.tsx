import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './index.module.scss';

const SuggestConsents = (
  {
    onSearchConsent,
    suggestionConsents,
    onLoadMoreSuggestionConsents,
    onResetSuggestionConsents,
  }: any,
  ref: any,
) => {
  const { t } = useTranslation();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      closeListUser: () => setDropdownVisible(false),
      openListUser: () => setDropdownVisible(true),
    };
  });

  const onSelect = (item: any) => () => {
    onSearchConsent(item.name);
    setDropdownVisible(false);
    onResetSuggestionConsents();
  };
  if (!dropdownVisible) return null;

  return (
    <>
      <div className={styles.listConsents}>
        <ul>
          <>
            {suggestionConsents?.data?.length === 0 ? (
              <p className={styles.noResultText}>{t('no_result_found')}</p>
            ) : (
              suggestionConsents.data.map((item: any) => {
                return (
                  <li onMouseDown={onSelect(item)} key={item.id}>
                    {item.name}
                  </li>
                );
              })
            )}
          </>
        </ul>
        {suggestionConsents?.isLoadMore && (
          <div className={styles.btnLoadMore} onMouseDown={onLoadMoreSuggestionConsents}>
            {t('load_more')}
          </div>
        )}
      </div>
    </>
  );
};

export default forwardRef(SuggestConsents);
