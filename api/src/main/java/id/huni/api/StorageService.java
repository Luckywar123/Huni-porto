package id.huni.api;

import java.io.IOException;
import java.util.Set;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

/** Upload gambar ke Supabase Storage (bucket public) pakai service key. */
@Service
public class StorageService {
    private static final Set<String> OK = Set.of("image/jpeg", "image/png", "image/webp");
    private final RestClient http;
    private final String url;

    public StorageService(@Value("${supabase.url}") String url, @Value("${supabase.service-key}") String key) {
        this.url = url;
        this.http = RestClient.builder()
            .defaultHeader("Authorization", "Bearer " + key)
            .defaultHeader("apikey", key)
            .build();
    }

    /** @return public URL file yang diupload */
    public String upload(String bucket, String folder, MultipartFile f) throws IOException {
        String ct = f.getContentType() == null ? "" : f.getContentType();
        if (!OK.contains(ct)) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "File harus JPG, PNG, atau WebP");
        String path = folder + "/" + UUID.randomUUID() + "." + ct.substring(6);
        http.post().uri(url + "/storage/v1/object/" + bucket + "/" + path)
            .header("x-upsert", "true")
            .contentType(MediaType.parseMediaType(ct))
            .body(f.getBytes())
            .retrieve().toBodilessEntity();
        return url + "/storage/v1/object/public/" + bucket + "/" + path;
    }
}
