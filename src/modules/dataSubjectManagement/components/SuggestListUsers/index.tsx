import React, { useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import styles from '../../index.module.scss';

const SuggestListUsers = (
  { data, loading, onSearchDataSubject, users, onLoadMoreUsers, onResetUsers }: any,
  ref: any
) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      closeListUser: () => setDropdownVisible(false),
      openListUser: () => setDropdownVisible(true)
    };
  });

  const onSelect = (item: any) => () => {
    onSearchDataSubject({
      firstname: item.name,
      isEqualSearch: true
    });
    setDropdownVisible(false);
    onResetUsers();
    navigate({
      pathname: '/data-subject',
      search: `?firstnameexact=${item.name}`
    });
  };

  if (!dropdownVisible || (!loading && !data)) return null;

  return (
    <div className={styles.listUsers}>
      <ul>
        <>
          {users?.data?.length === 0 ? (
            <p className={styles.noResultText}>{t('no_result_found')}</p>
          ) : (
            users.data.map((item: any) => {
              return (
                <li onMouseDown={onSelect(item)} key={item.id}>
                  {item.name}
                </li>
              );
            })
          )}
        </>
      </ul>
      {users?.isLoadMore && (
        <div className={styles.btnLoadMore} onMouseDown={onLoadMoreUsers}>
          {t('load_more')}
        </div>
      )}
    </div>
  );
};

export default React.forwardRef(SuggestListUsers);
