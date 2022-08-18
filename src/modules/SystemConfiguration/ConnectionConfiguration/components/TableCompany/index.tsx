import { Col, Pagination, Row } from 'antd';
import useSystemConfigPermission from 'hooks/useSystemConfigPermission';
import { paginationItemRender } from 'libraries/UI/Pagination';
import { CompanyItem } from './CompanyItem';

import styles from './index.module.scss';

const TableCompany = ({ data, onChangePage, refresh }: any) => {
  const { isHavePermissionEditSystem, isHavePermissionDeleteSystem } = useSystemConfigPermission();

  return (
    <div className={styles.container}>
      {data?.data?.length === 0 ? (
        <p className={styles.noResultText}>No result found</p>
      ) : (
        <>
          <div>
            <Row className={styles.header}>
              <Col className={styles.companyName}>Company Name</Col>
              <Col className={styles.companyCreatedDate}>Created Date</Col>
              {(isHavePermissionEditSystem || isHavePermissionDeleteSystem) && (
                <Col className={styles.companyAction}>Action</Col>
              )}
            </Row>

            <div>
              {data?.data?.map((company: any) => {
                return (
                  <CompanyItem key={`company-${company?.id}`} company={company} refresh={refresh} />
                );
              })}
            </div>
          </div>
          <Row justify='end' className={styles.pagination}>
            <Pagination
              current={data?.current}
              onChange={onChangePage}
              total={data?.total}
              defaultPageSize={data?.pageSize}
              itemRender={paginationItemRender}
              showSizeChanger={false}
            />
          </Row>
        </>
      )}
    </div>
  );
};

export default TableCompany;
