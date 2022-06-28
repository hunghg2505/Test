import { useRequest } from 'ahooks';
import { get, groupBy } from 'lodash';

const PAGE_SIZE = 10;

const data = [
  {
    application: 'sc',
    consentName: 'personalised-marketing',
    content:
      'รับข้อเสนอสินค้าและบริการ สิทธิประโยชน์ รายการส่งเสริมการขาย จากบริษัทในกลุ่มซีพี และพันธมิตรทางธุรกิจของเรา ที่วิเคราะห์คัดสรรมาเป็นพิเศษอิงตามความชื่นชอบและพฤติกรรมของคุณ โดยฉันยินยอมให้เอบีซี เปิดเผยข้อมูลส่วนบุคคลของฉันกับบริษัทและพันธมิตรเพื่อวัตถุประสงค์ดังกล่าว',
    title: 'การศึกษาวิเคราะห์ข้อมูลเพื่อการตลาด',
    version: '1.4',
  },
  {
    application: 'sc',
    consentName: 'sharing-mkt',
    content:
      'รับข้อเสนอสินค้าและบริการ สิทธิประโยชน์ รายการส่งเสริมการขาย จากบริษัทในกลุ่มซีพี และพันธมิตรทางธุรกิจของเรา ที่วิเคราะห์คัดสรรมาเป็นพิเศษอิงตามความชื่นชอบและพฤติกรรมของคุณ โดยฉันยินยอมให้เอบีซี เปิดเผยข้อมูลส่วนบุคคลของฉันกับบริษัทและพันธมิตรเพื่อวัตถุประสงค์ดังกล่าว',
    title: 'การศึกษาวิเคราะห์ข้อมูลเพื่อการตลาด',
    version: '1.4',
  },
  {
    application: 'sc',
    consentName: 'sharing-rd',
    content:
      'รับข้อเสนอสินค้าและบริการ สิทธิประโยชน์ รายการส่งเสริมการขาย จากบริษัทในกลุ่มซีพี และพันธมิตรทางธุรกิจของเรา ที่วิเคราะห์คัดสรรมาเป็นพิเศษอิงตามความชื่นชอบและพฤติกรรมของคุณ โดยฉันยินยอมให้เอบีซี เปิดเผยข้อมูลส่วนบุคคลของฉันกับบริษัทและพันธมิตรเพื่อวัตถุประสงค์ดังกล่าว',
    title: 'การศึกษาวิเคราะห์ข้อมูลเพื่อการตลาด',
    version: '1.4',
  },
  {
    application: 'sc',
    consentName: 'direct-marketing',
    content:
      'รับข้อเสนอสินค้าและบริการ สิทธิประโยชน์ รายการส่งเสริมการขาย จากบริษัทในกลุ่มซีพี และพันธมิตรทางธุรกิจของเรา ที่วิเคราะห์คัดสรรมาเป็นพิเศษอิงตามความชื่นชอบและพฤติกรรมของคุณ โดยฉันยินยอมให้เอบีซี เปิดเผยข้อมูลส่วนบุคคลของฉันกับบริษัทและพันธมิตรเพื่อวัตถุประสงค์ดังกล่าว',
    title: 'การศึกษาวิเคราะห์ข้อมูลเพื่อการตลาด',
    version: '1.4',
  },
];

const getConsents = async () => {
  const r: any = data;
  let formatConsents: any = groupBy(r, 'application');

  formatConsents = Object.keys(formatConsents).map((consentKey, i) => {
    const consents: any[] = formatConsents[consentKey];
    return {
      key: `${consentKey}`,
      dataConsent: {
        name: consentKey,
        lastUpdated: 'Date',
        version: 'V1.0',
        status: i % 2 === 0 ? 'Accepted' : 'Not Accepted',
        description: get(consents, '[0].title', ''),
        list: consents?.map((consent: any, idx: number) => ({
          id: consent.id,
          title: get(consent, 'consentName', ''),
          description: get(consent, 'content', ''),
          value: `${get(consent, 'consentName', '')}@${consent?.id}`,
          selected: consent?.myConsent?.reduce((acc: any, i: any) => {
            return {
              ...acc,
              [`${i?.key}@${consent?.id}`]: i?.value,
            };
          }, {}),
        })),
      },
    };
  });
  return {
    total: r?.content?.metadata?.total || 0,
    current: +r?.content?.metadata?.currentPage || 1,
    pageSize: PAGE_SIZE,
    data: formatConsents,
  };
};

const useConsentList = () => {
  const { data, loading } = useRequest(getConsents);

  const onChange = () => {
    console.log();
  };

  return {
    data,
    loading,
    onChange,
  };
};

export { useConsentList };
