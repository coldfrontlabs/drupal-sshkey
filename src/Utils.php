<?php

namespace Drupal\sshkey;

/**
 * SshkeyBreakdown service.
 */
class Utils {

  /**
   * Algorithm.
   *
   * @var string
   */
  private string $algorithm;

  /**
   * Key.
   *
   * @var string
   */
  private string $key;

  /**
   * Comment.
   *
   * @var string
   */
  private string $comment;

  /**
   * Constructor.
   */
  private function __construct($algorithm, $key, $comment = NULL) {
    $this->algorithm = $algorithm;
    $this->key = $key;
    $this->comment = $comment;
  }

  /**
   * Retrieves the last created node.
   */
  public static function initialize($value) {
    [$algorithm, $key, $comment] = array_pad(explode(' ', $value, 3), 3, NULL);
    return new static($algorithm, $key, $comment);
  }

  /**
   * Get the key algorithm.
   */
  public function getAlgorithm() {
    return $this->algorithm;
  }

  /**
   * Get the key.
   */
  public function getKey() {
    return $this->key;
  }

  /**
   * Get the comment.
   */
  public function getComment() {
    return $this->comment;
  }

  /**
   * Get the fingerprint.
   */
  public function getFingerprintMd5() {
    return md5(base64_decode($this->key, TRUE));
  }

  /**
   * Get the fingerprint.
   */
  public function getFingerprintSha256() {
    return base64_encode(hash('sha256', base64_decode($this->key), TRUE));
  }

}
