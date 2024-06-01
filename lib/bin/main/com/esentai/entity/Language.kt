package com.esentai.entity

enum class Language (val code : String) {
    EN("en"),
    KK("kk"),
    RU("ru");

    companion object {
        fun fromCode(code: String): Language? {
            for (value in values()) {
                if (value.code == code) {
                    return value
                }
            }
            return null
        }
    }
}