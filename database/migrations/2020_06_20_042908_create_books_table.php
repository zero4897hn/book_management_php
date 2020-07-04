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
            $table->string('isbn', 50)->unique();
            $table->string('author', 50);
            $table->string('publisher', 50);
            $table->string('editor', 50)->nullable();
            $table->text('description')->nullable();
            $table->bigInteger('user_id');
            $table->integer('rating')->default(0)->unsigned();
            $table->integer('comment_count')->default(0)->unsigned();
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
