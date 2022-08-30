import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    width: '100vw',
    height: '100vh',
    paddingTop: 35,
    paddingBottom: 35,
    paddingHorizontal: 35,
    fontSize: 12,
    // fontFamily: 'Noto Sans Thai',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },

  subTitle: {
    fontSize: 12,
    textAlign: 'center',
  },
  desc: {
    marginTop: 20,
  },

  text: {
    fontSize: 12,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    wordBreak: 'break-all',
  },
  label: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 12,
    textDecoration: 'underline',
  },

  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
  },

  checkbox: {
    width: 15,
    height: 15,
    border: '1px solid black',
    marginRight: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dividerSignature: {
    width: 160,
    height: 1,
    backgroundColor: 'black',
    marginTop: 50,
    marginLeft: 'auto',
    marginRight: 30,
  },

  textSignature: {
    textAlign: 'right',
    marginRight: 40,
  },
  date: { textAlign: 'right', marginRight: 70 },

  // table
  table: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    width: '50%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    wordBreak: 'break-all',
  },
});

export const MyDocument = ({ caseData }: any) => {
  return (
    <Document language='Thailand'>
      <Page size='A3' style={styles.page} wrap={false}>
        <Image
          style={{ width: 60, height: 60 }}
          src={`data:image/png;base64,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`}
        />
        <Text style={styles.title}>Data Subject Rights Responding Form</Text>
        <Text style={styles.subTitle}>แบบฟอร์มแจ้งผลกํารใช้สิทธิของเจ้ําของข้อมูลส่วนบุคคล</Text>
        <Text style={styles.desc}>
          Following the data subject right request in accordance with Thailand PDPA B.E. 2562,
          {caseData?.companyInfo?.nameEN} would like to inform the result after considering the
          request.
        </Text>
        <Text style={styles.text}>
          ตามที่ {caseData?.companyInfo?.nameTH}{' '}
          ได้รับคำขอใช้สิทธิของท่านในฐานะเจ้าของข้อมูลส่วนบุคคล
          ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 บริษัทฯ
          ขอแจ้งให้ท่านทราบถึงผลการพิจารณาคำขอ ดังต่อไปนี้
        </Text>

        <Text style={styles.label}>Request information/ข้อมูลค ําขอที่เรําได้รับ:</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Full name of data subject</Text>
              <Text style={styles.tableCell}>ชื่อ นํามสกุล ของเจ้องของข้อมูลส่วนบุคคล</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{caseData.dataSubjectRight}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Summary of the right requested</Text>
              <Text style={styles.tableCell}>สิทธิตํามที่ท่ํานได้ยื่นค ําขอ (โดยสรุป)</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{caseData.description}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.label}>Result/ผลกํารพิจํารณําด ําเนินกํารตํามค ําขอ:</Text>
        <View>
          <View style={styles.checkboxContainer}>
            <View style={styles.checkbox}>
              {caseData.result?.toLowerCase() === 'completed' && (
                <Image
                  style={{ width: 12, height: 12 }}
                  src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAABmJLR0QA/wD/AP+gvaeTAAABBElEQVRIie3UMUoDQRQG4E8rUTAqRE9iIWij2IhYeQAP4BUEO7EJqJ122ukhbKwsRQRFEARBsQ4WmsQiWQizs5CNs2CRH6aZ9+Z9O7C7jPJPsoNj1KtElvCDDj6wWQUyiccekq0vjKeGjgKkg8vUyDJaAfKJhZTIFJ7lb7OdEoHTCHKRGllHO0DeMJcSqeFV/jYbZYbM4kD3uyjKeQQ5K4PM4LZ3sIm1SM9WBHnBdBnoOhjQxGpfvY73oKcd9AyUm8jT9mNXkfpJWQTmcV+ANSL7T7q/n6FSx11kaLhaWBkWKYMd/hUZBHvARCqoCPvGYkokS/iC7FeBZKlhD7sYqxIaJZdfhYF6R58+xmoAAAAASUVORK5CYII=`}
                />
              )}
            </View>
            <Text>Accept the request / ยอมรับด ําเนินกํารตํามค ําร้องขอ</Text>
          </View>
          <Text>Actions according to the request / รํายละเอียดกํารด ําเนินกํารตํามค ําขอ</Text>
          <Text style={styles.text}>
            {caseData.result?.toLowerCase() === 'completed' ? caseData.reason : ''}
          </Text>
        </View>
        <View style={{ marginTop: 10, display: 'flex' }}>
          <View style={styles.checkboxContainer}>
            <View style={styles.checkbox}>
              {caseData.result?.toLowerCase() === 'rejected' && (
                <Image
                  style={{ width: 12, height: 12 }}
                  src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAABmJLR0QA/wD/AP+gvaeTAAABBElEQVRIie3UMUoDQRQG4E8rUTAqRE9iIWij2IhYeQAP4BUEO7EJqJ122ukhbKwsRQRFEARBsQ4WmsQiWQizs5CNs2CRH6aZ9+Z9O7C7jPJPsoNj1KtElvCDDj6wWQUyiccekq0vjKeGjgKkg8vUyDJaAfKJhZTIFJ7lb7OdEoHTCHKRGllHO0DeMJcSqeFV/jYbZYbM4kD3uyjKeQQ5K4PM4LZ3sIm1SM9WBHnBdBnoOhjQxGpfvY73oKcd9AyUm8jT9mNXkfpJWQTmcV+ANSL7T7q/n6FSx11kaLhaWBkWKYMd/hUZBHvARCqoCPvGYkokS/iC7FeBZKlhD7sYqxIaJZdfhYF6R58+xmoAAAAASUVORK5CYII=`}
                />
              )}
            </View>
            <Text>Reject the request / ปฏิเสธกํารด ําเนินกํารตํามค ําขอ</Text>
          </View>
          <Text>Reason of rejection / เหตุผลในกํารปฏิเสธ:</Text>
          <Text style={styles.text}>
            {caseData.result?.toLowerCase() === 'rejected' ? caseData.reason : ''}
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text>If you have further questions, please contact {caseData?.companyInfo?.email}</Text>
          <Text>
            หํากท่ํานมีค ําถํามเพิ่มเติม สํามํารถติดต่อเรําได้ที่ {caseData?.companyInfo?.email}
          </Text>
        </View>
        <View>
          <View style={styles.dividerSignature}></View>
          <Text style={styles.textSignature}>TextSignature of Staff</Text>
          <View style={styles.dividerSignature}></View>
          <Text style={styles.date}>Date/วันที่</Text>
          <Text style={styles.date}>{caseData?.responseDate}</Text>
        </View>
        <View style={{ marginTop: 40 }} wrap={false}>
          <Text>{caseData?.companyInfo?.addressEN}</Text>
          <Text>{caseData?.companyInfo?.addressTH}</Text>
        </View>
      </Page>
    </Document>
  );
};
