import ApiUtils from 'utils/api/api.utils';
import { useRequest } from 'ahooks';
import { get, groupBy } from 'lodash';

const PAGE_SIZE = 6;

const FAKE_DATA = [
  {
    application: 'sc',
    consentName: 'personalised-marketing',
    content:
      'รับข้อเสนอสินค้าและบริการ สิทธิประโยชน์ รายการส่งเสริมการขาย จากบริษัทในกลุ่มซีพี และพันธมิตรทางธุรกิจของเรา ที่วิเคราะห์คัดสรรมาเป็นพิเศษอิงตามความชื่นชอบและพฤติกรรมของคุณ โดยฉันยินยอมให้เอบีซี เปิดเผยข้อมูลส่วนบุคคลของฉันกับบริษัทและพันธมิตรเพื่อวัตถุประสงค์ดังกล่าว',
    title: 'การศึกษาวิเคราะห์ข้อมูลเพื่อการตลาด',
    version: '1.4'
  },
  {
    application: 'sc',
    consentName: 'sharing-mkt',
    content:
      'รับข้อเสนอสินค้าและบริการ สิทธิประโยชน์ รายการส่งเสริมการขาย จากบริษัทในกลุ่มซีพี และพันธมิตรทางธุรกิจของเรา ที่วิเคราะห์คัดสรรมาเป็นพิเศษอิงตามความชื่นชอบและพฤติกรรมของคุณ โดยฉันยินยอมให้เอบีซี เปิดเผยข้อมูลส่วนบุคคลของฉันกับบริษัทและพันธมิตรเพื่อวัตถุประสงค์ดังกล่าว',
    title: 'การศึกษาวิเคราะห์ข้อมูลเพื่อการตลาด',
    version: '1.4'
  },
  {
    application: 'sc',
    consentName: 'sharing-rd',
    content:
      'รับข้อเสนอสินค้าและบริการ สิทธิประโยชน์ รายการส่งเสริมการขาย จากบริษัทในกลุ่มซีพี และพันธมิตรทางธุรกิจของเรา ที่วิเคราะห์คัดสรรมาเป็นพิเศษอิงตามความชื่นชอบและพฤติกรรมของคุณ โดยฉันยินยอมให้เอบีซี เปิดเผยข้อมูลส่วนบุคคลของฉันกับบริษัทและพันธมิตรเพื่อวัตถุประสงค์ดังกล่าว',
    title: 'การศึกษาวิเคราะห์ข้อมูลเพื่อการตลาด',
    version: '1.4'
  },
  {
    application: 'sc',
    consentName: 'direct-marketing',
    content:
      'รับข้อเสนอสินค้าและบริการ สิทธิประโยชน์ รายการส่งเสริมการขาย จากบริษัทในกลุ่มซีพี และพันธมิตรทางธุรกิจของเรา ที่วิเคราะห์คัดสรรมาเป็นพิเศษอิงตามความชื่นชอบและพฤติกรรมของคุณ โดยฉันยินยอมให้เอบีซี เปิดเผยข้อมูลส่วนบุคคลของฉันกับบริษัทและพันธมิตรเพื่อวัตถุประสงค์ดังกล่าว',
    title: 'การศึกษาวิเคราะห์ข้อมูลเพื่อการตลาด',
    version: '1.4'
  }
];

export const getContentService = async (value: any): Promise<any> => {
  const params = {
    userId: '',
    limit: PAGE_SIZE,
    page: 1
  };

  // const r = await ApiUtils.fetch();

  let formatConsents: any = groupBy(FAKE_DATA, 'application');
  formatConsents = Object.keys(formatConsents).map((consentKey, i) => {
    const consents: any[] = formatConsents[consentKey];
    return {
      key: `CONSENT-${consentKey}`,
      dataConsent: {
        name: consentKey,
        lastUpdated: 'Date',
        version: 'V1.0',
        status: i % 2 === 0 ? 'Accepted' : 'Not Accepted',
        description: get(consents, '[0].title', ''),
        list: consents.map((consent: any, idx: number) => ({
          title: get(consent, 'consentName', ''),
          description: get(consent, 'content', ''),
          value: `${get(consent, 'consentName', '')}-${idx}`,
          checked: !!idx
        }))
      }
    };
  });
  console.log(formatConsents);

  const r = new Array(10).fill(0).map((_, i) => ({
    key: `${i}`,
    dataConsent: {
      name: 'Consent ABC',
      lastUpdated: 'Date',
      version: 'V1.0',
      status: i % 2 === 0 ? 'Accepted' : 'Not Accepted',
      description: 'Description',
      list: [
        {
          title: 'Title 1',
          description: 'Description 1',
          value: 'Value1'
        },
        {
          title: 'Title 2',
          description: 'Description 2',
          value: 'Value2'
        }
      ]
    }
  }));

  const formatData = {
    list: formatConsents,
    current: 1
  };

  return {
    ...formatData,
    total: Math.ceil(formatData.list.length / PAGE_SIZE),
    data: formatData?.list?.slice(
      (formatData.current - 1) * PAGE_SIZE,
      (formatData.current - 1) * PAGE_SIZE + PAGE_SIZE
    )
  };
};

export const useConsent = () => {
  const { data, loading, mutate } = useRequest(getContentService);

  const onChange = (current: number) => {
    if (mutate) {
      mutate({
        ...data,
        current,
        data: data?.list?.slice((current - 1) * PAGE_SIZE, (current - 1) * PAGE_SIZE + PAGE_SIZE)
      });
    }
  };

  return {
    data,
    loading,
    onChange
  };
};
