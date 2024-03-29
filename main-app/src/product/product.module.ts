import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, productSchema } from './product.model';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [MongooseModule.forFeature([{name :Product.name, schema: productSchema }]),
],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
