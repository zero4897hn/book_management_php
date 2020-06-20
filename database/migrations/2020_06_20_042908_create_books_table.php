<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name', 50);
            $table->string('cover', 255);
            $table->text('content');
            $table->string('isbn', 50)->unique();
            $table->string('author', 50);
            $table->string('publisher', 50);
            $table->string('editor', 50);
            $table->text('description');
            $table->bigInteger('user_id');
            $table->bigInteger('category_id');
            $table->integer('rating')->unsigned();
            $table->integer('comment_count')->unsigned();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('books');
    }
}
