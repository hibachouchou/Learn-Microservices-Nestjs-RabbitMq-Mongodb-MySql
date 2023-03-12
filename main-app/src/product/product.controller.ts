import { Controller, Get, Param, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService,
    ) { }

    @Get()
    async all() {
        return this.productService.all()
    }
@Post(':id/like')
async like(@Param('id')id:number){
const product=this.productService.findOne(id)
return this.productService.update(id,{likes:(await product).likes})
}


    @EventPattern('product_created')
    async productCreated(product: Product) {
        await this.productService.create(
            {
                id:product.id,
                title:product.title,
                image:product.image,
                likes:product.likes
            }
        )
    }
    @EventPattern('product_updated')
    async productUpdated(product: Product) {
        await this.productService.update(product.id,
            {
                id: product.id,
                title: product.title,
                image: product.image,
                likes: product.likes
            })
    }
    @EventPattern('product_deleted')
    async productDeleted(id: number) {
        await this.productService.delete(id)
    }
}
