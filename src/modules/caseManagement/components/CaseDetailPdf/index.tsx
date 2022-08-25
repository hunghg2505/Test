import font from 'assets/NotoSansThai/NotoSansThai-Regular.ttf';

import { Document, Font, Page, StyleSheet, Text, View, Image } from '@react-pdf/renderer';

Font.register({
  family: 'Noto Sans Thai',
  fonts: [
    {
      src: font,
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    width: '100vw',
    height: '100vh',
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontSize: 12,
    fontFamily: 'Noto Sans Thai',
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
    fontSize: 14,
  },
  label: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 12,
    textDecoration: 'underline',
  },

  dataSubject: {
    border: '1px solid black',
    width: '100%',

    display: 'flex',

    flexDirection: 'column',
  },
  fullName: {
    display: 'flex',
    flexDirection: 'row',
    padding: '0px 20px',
    justifyContent: 'space-between',
    borderBottom: '1px solid black',
  },
  summary: {
    display: 'flex',
    padding: '0px 20px',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  divider: {
    width: 1,
    height: '100%',
    backgroundColor: 'black',
    marginLeft: 0,
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
});

export const MyDocument = ({ caseData }: any) => {
  return (
    <Document language='Thailand'>
      <Page size='A4' style={styles.page} fixed>
        <Text style={styles.title}>Data Subject Rights Responding Form</Text>
        <Text style={styles.subTitle}>แบบฟอร์มแจ้งผลกํารใช้สิทธิของเจ้ําของข้อมูลส่วนบุคคล</Text>
        <Text style={styles.desc}>
          Following the data subject right request in accordance with Thailand PDPA B.E. 2562,
          [companyNameEN]would like to inform the result after considering the request.
        </Text>
        <Text style={styles.text}>
          ตามที่ [companyNameTH]ได้รับคำขอใช้สิทธิของท่านในฐานะเจ้าของข้อมูลส่วนบุคคล
          ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 บริษัทฯ
          ขอแจ้งให้ท่านทราบถึงผลการพิจารณาคำขอ ดังต่อไปนี้
        </Text>

        <Text style={styles.label}>Request information/ข้อมูลค ําขอที่เรําได้รับ:</Text>
        <View style={styles.dataSubject}>
          <View style={styles.fullName}>
            <View>
              <Text>Full name of data subject</Text>
              <Text>ชื่อ นํามสกุล ของเจ้องของข้อมูลส่วนบุคคล</Text>
            </View>
            <View style={styles.divider}></View>
            <View>
              <Text>{caseData.dataSubjectRight}</Text>
            </View>
          </View>
          <View style={styles.summary}>
            <View>
              <Text>Summary of the right requested</Text>
              <Text>สิทธิตํามที่ท่ํานได้ยื่นค ําขอ (โดยสรุป)</Text>
            </View>
            <View style={styles.divider}></View>
            <View>
              <Text>{caseData.description}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.label}>Result/ผลกํารพิจํารณําด ําเนินกํารตํามค ําขอ:</Text>
        <View>
          <View style={styles.checkboxContainer}>
            <View style={styles.checkbox}>
              {caseData.result === 'Accepted' && (
                <Image
                  style={{ width: 12, height: 12 }}
                  src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAABmJLR0QA/wD/AP+gvaeTAAABBElEQVRIie3UMUoDQRQG4E8rUTAqRE9iIWij2IhYeQAP4BUEO7EJqJ122ukhbKwsRQRFEARBsQ4WmsQiWQizs5CNs2CRH6aZ9+Z9O7C7jPJPsoNj1KtElvCDDj6wWQUyiccekq0vjKeGjgKkg8vUyDJaAfKJhZTIFJ7lb7OdEoHTCHKRGllHO0DeMJcSqeFV/jYbZYbM4kD3uyjKeQQ5K4PM4LZ3sIm1SM9WBHnBdBnoOhjQxGpfvY73oKcd9AyUm8jT9mNXkfpJWQTmcV+ANSL7T7q/n6FSx11kaLhaWBkWKYMd/hUZBHvARCqoCPvGYkokS/iC7FeBZKlhD7sYqxIaJZdfhYF6R58+xmoAAAAASUVORK5CYII=`}
                />
              )}
            </View>
            <Text>Accept the request / ยอมรับด ําเนินกํารตํามค ําร้องขอ</Text>
          </View>
          <Text>Actions according to the request / รํายละเอียดกํารด ําเนินกํารตํามค ําขอ</Text>
          <Text>{caseData.result === 'Accepted' ? caseData.reason : ''}</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={styles.checkboxContainer}>
            <View style={styles.checkbox}>
              {caseData.result === 'Rejected' && (
                <Image
                  style={{ width: 12, height: 12 }}
                  src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAABmJLR0QA/wD/AP+gvaeTAAABBElEQVRIie3UMUoDQRQG4E8rUTAqRE9iIWij2IhYeQAP4BUEO7EJqJ122ukhbKwsRQRFEARBsQ4WmsQiWQizs5CNs2CRH6aZ9+Z9O7C7jPJPsoNj1KtElvCDDj6wWQUyiccekq0vjKeGjgKkg8vUyDJaAfKJhZTIFJ7lb7OdEoHTCHKRGllHO0DeMJcSqeFV/jYbZYbM4kD3uyjKeQQ5K4PM4LZ3sIm1SM9WBHnBdBnoOhjQxGpfvY73oKcd9AyUm8jT9mNXkfpJWQTmcV+ANSL7T7q/n6FSx11kaLhaWBkWKYMd/hUZBHvARCqoCPvGYkokS/iC7FeBZKlhD7sYqxIaJZdfhYF6R58+xmoAAAAASUVORK5CYII=`}
                />
              )}
            </View>
            <Text>Reject the request / ปฏิเสธกํารด ําเนินกํารตํามค ําขอ</Text>
          </View>
          <Text>Reason of rejection / เหตุผลในกํารปฏิเสธ:</Text>
          <Text>{caseData.result === 'Rejected' ? caseData.reason : ''}</Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text>If you have further questions, please contact dpo@ascendbit.net</Text>
          <Text>หํากท่ํานมีค ําถํามเพิ่มเติม สํามํารถติดต่อเรําได้ที่ dpo@ascendbit.net</Text>
        </View>
        <View>
          <View style={styles.dividerSignature}></View>
          <Text style={styles.textSignature}>TextSignature of Staff</Text>
          <View style={styles.dividerSignature}></View>
          <Text style={styles.date}>Date/วันที่</Text>
        </View>
        <View style={{ marginTop: 40 }} fixed>
          <Text>Company Address EN</Text>
          <Text>Company Address TH</Text>
        </View>
      </Page>
    </Document>
  );
};
