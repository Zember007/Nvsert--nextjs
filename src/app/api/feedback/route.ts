import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const data = {
      name: formData.get('name'),
      contact: formData.get('contact'),
      comment: formData.get('comment'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      timestamp: new Date().toISOString(),
    };

    // Логируем данные (в продакшене здесь должна быть отправка на email или в БД)
    console.log('=== Новая заявка ===');
    console.log('Имя:', data.name);
    console.log('Контакт:', data.contact);
    console.log('Email:', data.email);
    console.log('Телефон:', data.phone);
    console.log('Комментарий:', data.comment);
    console.log('Время:', data.timestamp);
    console.log('==================');

    // TODO: Здесь должна быть логика отправки данных:
    // - Отправка email через nodemailer/sendgrid
    // - Сохранение в базу данных
    // - Отправка в CRM систему
    // - Отправка в Telegram bot
    // - etc.

    // Пример отправки в Telegram (раскомментируйте и настройте):
    /*
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
    
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const message = `
🆕 Новая заявка с сайта

👤 Имя: ${data.name}
📧 Email: ${data.email || 'не указан'}
📱 Телефон: ${data.phone || 'не указан'}
💬 Комментарий: ${data.comment || 'отсутствует'}
🕐 Время: ${data.timestamp}
      `.trim();

      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML'
        })
      });
    }
    */

    // Возвращаем успешный ответ
    return NextResponse.json(
      { 
        success: true, 
        message: 'Заявка успешно отправлена',
        data 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Ошибка при обработке заявки:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Ошибка при отправке заявки',
        error: error instanceof Error ? error.message : 'Неизвестная ошибка'
      },
      { status: 500 }
    );
  }
}

