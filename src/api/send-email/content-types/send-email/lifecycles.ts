const nodemailer = require('nodemailer');
const path = require('path');

module.exports = {
    async afterCreate({ result }) {
        try {
            const transporter = nodemailer.createTransport({
                host: strapi.config.get('plugin.email.providerOptions.host'),
                port: strapi.config.get('plugin.email.providerOptions.port'),
                auth: {
                    user: strapi.config.get('plugin.email.providerOptions.auth.user'),
                    pass: strapi.config.get('plugin.email.providerOptions.auth.pass'),
                },
            });


            const html = ` <div class="content">
        <div>
            <ol class="ol">
                <li>ИНН организации:
                    <ul>
                        <li>${result.inn_organization}</li>
                    </ul>
                </li>
                <li>Полное наименование организации:
                    <ul>
                        <li>${result.full_name_organization}</li>
                    </ul>
                </li>
                <li>ФИО руководителя организации:
                    <ul>
                        <li>${result.full_name_ceo}</li>
                    </ul>
                </li>
                <li>ФИО ответственного сотрудника:
                    <ul>
                        <li>${result.full_name_responsible_employee}</li>
                    </ul>
                </li>
                <li>Контакты:
                    <ul>
                        <li>${result.contact}</li>
                    </ul>
                </li>
            </ol>

        </div>
        <h3>Файлы</h3>
        <div>
            <ol class="ol">
                <li>Балансовый отчет за 3 года
                    <ul>
                        <li> <a href="${result.balance_three_years && result.balance_three_years[0].url}" download>Скачать здесь</a></li>
                    </ul>
                </li>

                <li>Отчет о прибылях и убытках за 3 года
                    <ul>
                        <li> <a href="${result.report_profit_loss_three && result.report_profit_loss_three[0].url}" download>Скачать здесь</a></li>
                    </ul>
                </li>

                <li>Отчет о движениях денежных средств за 3 года
                    <ul>
                        <li> <a href="${result?.cash_flow_statement && result?.cash_flow_statement[0].url}" download>Скачать здесь</a></li>
                    </ul>
                </li>

                <li>Отчет об изменениях в капитале (если таковое имело место в последние 2 года)
                    <ul>
                        <li> <a href="${result?.statement_of_changes_equity && result?.statement_of_changes_equity[0].url}" download>Скачать здесь</a></li>
                    </ul>
                </li>
                <li>Расшифровка дебиторов с датой возникновения и погашения задолженности
                    <ul>
                        <li> <a href="${result?.decoding_debtors_repayment && result?.decoding_debtors_repayment[0].url}" download>Скачать здесь</a></li>
                    </ul>
                </li>
                <li>Расшифровка кредиторов с датами погашения, с приложениями договоров займа

                    <ul>
                        <li> <a href="${result?.decoding_credits && result?.decoding_credits[0].url}" download>Скачать здесь</a></li>
                    </ul>
                </li>
                 <li>Расшифровка основных средств предприятия

                    <ul>
                        <li> <a href="${result?.decoding_fixed_assets && result?.decoding_fixed_assets[0].url}" download>Скачать здесь</a></li>
                    </ul>
                </li>
                <li>Заключение/подтверждение внешнего аудитора за последний год, которое должны предоставить заемщики -
                    юридические лица, обязанные проходить ежегодный аудит согласно законодательству Кыргызской
                    Республики
                    <ul>
                        <li> <a href="${result?.Conclusion_confirmation && result?.Conclusion_confirmation[0].url}" download>Скачать здесь</a></li>
                    </ul>
                </li>

            </ol>
        </div>
    </div>`
            const mailOptions = {
                from: strapi.config.get('plugin::email.settings.defaultFrom'),
                to: 'nurlanuuluzajnak75@gmail.com',
                subject: `Новая запись создана:`,
                html,
            };

            await transporter.sendMail(mailOptions);
            console.log(
                'Письмо успешно отправлено',
                `Запись с названием "${JSON.stringify(result, null, 2)}"`
            );
        } catch (err) {
            console.error('Ошибка при отправке письма', err);
        }
    },
};
// 