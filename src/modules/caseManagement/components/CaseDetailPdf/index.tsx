import font from 'assets/NotoSansThai/NotoSansThai-Regular.ttf';

import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

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
    // justifyContent: 'space-between',
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

// Create Document Component
export const MyDocument = () => (
  <Document language='Thailand'>
    <Page size='A4' style={styles.page}>
      <Text style={styles.title}>Data Subject Rights Responding Form</Text>
      <Text style={styles.subTitle}>แบบฟอร์มแจ้งผลกํารใช้สิทธิของเจ้ําของข้อมูลส่วนบุคคล</Text>
      <Text style={styles.desc}>
        Following the data subject right request in accordance with Thailand PDPA B.E. 2562, Ascend
        Bit Company Limited (ABC) would like to inform the result after considering the request.
      </Text>
      <Text style={styles.text}>ตํามที่ บริษัท แอสเซนด์ บิท จ ํากัด (บริษัทฯ)</Text>
      <Text style={styles.text}>ได้รับค ําขอใช้สิทธิของท่ํานในฐํานะเจ้ําของข้อมูลส่วนบุคคล</Text>
      <Text style={styles.text}>ตํามพระรําชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 บริษัทฯ</Text>
      <Text style={styles.text}>ขอแจ้งให้ท่ํานทรําบถึงผลกํารพิจํารณําค ําขอ ดังต่อไปนี้</Text>
      <Text style={styles.label}>Request information/ข้อมูลค ําขอที่เรําได้รับ:</Text>
      <View style={styles.dataSubject}>
        <View style={styles.fullName}>
          <View>
            <Text>Full name of data subject</Text>
            <Text>ชื่อ นํามสกุล ของเจ้องของข้อมูลส่วนบุคคล</Text>
          </View>
          <View style={styles.divider}></View>
          <View>
            <Text>Value Full name of data subject</Text>
          </View>
        </View>
        <View style={styles.summary}>
          <View>
            <Text>Summary of the right requested</Text>
            <Text>สิทธิตํามที่ท่ํานได้ยื่นค ําขอ (โดยสรุป)</Text>
          </View>
          <View style={styles.divider}></View>
          <View>
            <Text>Value Summary of the right requested</Text>
          </View>
        </View>
      </View>
      <Text style={styles.label}>Result/ผลกํารพิจํารณําด ําเนินกํารตํามค ําขอ:</Text>
      <View>
        <View style={styles.checkboxContainer}>
          <View style={styles.checkbox}></View>
          <Text>Accept the request / ยอมรับด ําเนินกํารตํามค ําร้องขอ</Text>
        </View>
        <Text>Actions according to the request / รํายละเอียดกํารด ําเนินกํารตํามค ําขอ</Text>
        <Text>Value Actions according to the request </Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <View style={styles.checkboxContainer}>
          <View style={styles.checkbox}></View>
          <Text>Reject the request / ปฏิเสธกํารด ําเนินกํารตํามค ําขอ</Text>
        </View>
        <Text>Reason of rejection / เหตุผลในกํารปฏิเสธ:</Text>
        <Text>Value Reason of rejection </Text>
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
    </Page>
  </Document>
);
