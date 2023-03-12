import { Body, Controller, Get, Post ,Param, Put} from '@nestjs/common';
import { Delete, Inject } from '@nestjs/common/decorators';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

constructor(private productService : ProductService,
    @Inject('PRODUCT_SERVICE') private readonly client :ClientGrpcProxy
    ){}

    @Get()
    all(){
        //this.client.emit('hello','Hello from RabbitMQ !')
        return this.productService.all()
    }

@Post()
create(@Body('title')title:string,@Body('image')image:string){
    const product=  this.productService.create({title,image})
    this.client.emit('product_created',product)
    return product
}

@Get(':id')
 get(@Param('id')id:number){
    return  this.productService.get(id)
}

@Put(':id')
update(@Param('id')id:number,@Body('title')title:string,@Body('image')image:string){

    const product2= this.productService.update(id,{title,image})
    this.client.emit('product_updated',product2)
    return product2

}

@Delete(':id')
delete(@Param('id')id:number){
    const prod=this.productService.delete(id)
    this.client.emit('product_deleted',prod)
    return prod
}
}
