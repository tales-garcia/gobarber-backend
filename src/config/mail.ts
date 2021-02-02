interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}
console.log(process.env.MAIL_DRIVER);
export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'contato@sounerd.com.br',
      name: 'Tales | GoBarber',
    },
  },
} as IMailConfig;
