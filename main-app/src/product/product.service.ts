import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.model';
@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>) { }

    async all(): Promise<Product[]> {
        return this.productModel.find().exec()
    }

    async create(data): Promise<Product> {
        return new this.productModel(data).save()
    }
    async findOne(id:number): Promise<Product>{
return  this.productModel.findById(id)
    }
    async update(id:number,data:any): Promise<any> {
        return  this.productModel.findOneAndUpdate({id},data)
    }
    async delete(id:number): Promise<void> {
          this.productModel.deleteOne({id})
    }
}
