import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
async function bootstrap() {
   const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
   {
    transport: Transport.RMQ,
    options: {
    urls: ['amqps://efnilhtj:Jz5s5VVtFpJUspPcqwXQOJWPD_oREMhZ@kangaroo.rmq.cloudamqp.com/efnilhtj'],
    queue: 'main_queue',
    queueOptions: {
      durable: false
    },
  },
})
  
   //app.listen(()=>{
    //console.log('microservice is listening')
//  });
await app.listen()
}
bootstrap();
